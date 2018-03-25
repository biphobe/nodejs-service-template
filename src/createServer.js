import server from "./server";

export default async function createServer() {
    try {
        await server.start();
    } catch (err) {
        console.log("Error! Couldn't start the server because of:");
        console.log(err);

        process.exit(1);
    }

    process.on('SIGINT', process.exit);
    process.on('SIGTERM', async () => {
        const delay = Number(process.env.GRACEFUL_SHUTDOWN_DELAY_MS);

        console.log(`Received SIGTERM, shutting down in ${delay}ms...`);

        try {
            await server.stop({
                timeout: delay
            });
        } catch(err) {
            console.log("Error! Couldn't shutdown gracefully because of:");
            console.log(err);
        } finally {
            console.log("Exiting process...");

            process.exit();
        }
    });

    process.on('unhandledRejection', (err) => {
        console.log('Unhandler error occured:');
        console.log(err);
    });

    console.log(`Server running at ${server.info.uri}`);
}
