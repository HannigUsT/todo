import {seed} from '../../data/seed';
import app from './config/app';
import env from './config/env';

async function startServer() {
    try {
        await seed();

        const server = app.listen(env.port, () => {
            console.info(`Express server running on: localhost:${env.port}`);
        });

        const shutdownExpressServer = () => {
            server.close(() => {
                console.info('\n');
                console.info('Express server closed');
                console.info('\n');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdownExpressServer);
        process.on('SIGTERM', shutdownExpressServer);
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();
