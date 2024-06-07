import app from "./common/server.common";

const port: string | number = process.env.PORT || 3000;

try {
    app.listen(port, (): void => {        
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}