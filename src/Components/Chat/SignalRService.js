import * as signalR from '@microsoft/signalr';

class SignalRService {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44317/chatHub") // replace with your server url
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.onclose(async () => {
            await this.start();
        });

        this.connection.on("ReceiveMessage", (user, message) => {
            // handle the message
        });
    }

    async start() {
        try {
            await this.connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }

    async send(groupName, message) {
        try {
            await this.connection.invoke("SendMessage", groupName, message);
        } catch (err) {
            console.error(err);
        }
    }

    async addToGroup(groupName) {
        try {
            await this.connection.invoke("AddToGroup", groupName);
        } catch (err) {
            console.error(err);
        }
    }

    async removeFromGroup(groupName) {
        try {
            await this.connection.invoke("RemoveFromGroup", groupName);
        } catch (err) {
            console.error(err);
        }
    }
}

export const signalRService = new SignalRService();