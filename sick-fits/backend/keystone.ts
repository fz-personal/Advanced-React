import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { User } from './schemas/User';
import {withItemData, statelessSessions} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { Product } from './schemas/Product';

const dataBaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = { 
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
    },
});

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: dataBaseURL,
        // TODO : Add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
        User,
        Product
    }),
    ui: {
        // Shoe the UI only for people who pass this test
        isAccessAllowed: ({session}) => {
            console.log(session);
            return !!session?.data
        },
    },
    // TODO: Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL Query
        User: `id name email`,
    })
}));
