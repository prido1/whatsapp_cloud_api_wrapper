import {
    WaTextMessageInterface,
    WaImageMessageInterface,
    WaAudioMessageInterface,
    WaDocumentMessageInterface,
    WaButtonInterface,
    WaInteractiveMessageHeaderInterface,
    WaListSectionRow,
    WaInteractiveListMessageInterface,
    WaInteractiveButtonMessageInterface,
    WaListSectionInterface,
    BusinessProfileParameters,
    verticalAcceptedValues,
    WaVideoMessageInterface
} from "./cantracts";
import { WHATSAPP_CLOUD_API_ENDPOINT } from "./constants";
import { InvalidWaBusinessProfileObjError, InvalidWaButtonMessageObjError, InvalidWaInteractiveMessageObjError, InvalidWaListMessageObjError, InvalidWaMediaMessageObjError, InvalidWaMessageObjError, InvalidWaMessageTextObjError } from "./errorHandlers/whatsAppObjError";

import fetch from 'node-fetch';

export class WaApi {
    messageEndpoint: string;

    constructor(public phone_number_id: string, public access_token: string) {
        this.messageEndpoint = `${WHATSAPP_CLOUD_API_ENDPOINT}/${phone_number_id}/messages`;
    }

    private async sendMessage(content: any) {
        return fetch(this.messageEndpoint, {
            method: 'post',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.access_token}`
            }
        });
    }

    public async sendTextMessage(to_phone: string, message_body: string, message_id: string | null = null, preview_url: boolean = false) {
        if (message_body.length > 1024) throw new InvalidWaMessageTextObjError('Body text length exceeds maximum allowed ( 1024 )');
        let message_content: WaTextMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "text",
            text: { preview_url, body: message_body }
        }

        if (message_id) message_content.context = { message_id: message_id };

        return this.sendMessage(message_content);
    }

    public async sendImageMessage(to_phone: string, img_link: string, caption: string | null = null, message_id: string | null = null) {
        let message_content: WaImageMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "image",
            image: { link: img_link }
        }

        if (caption) {
            if (caption.length > 1024) throw new InvalidWaMediaMessageObjError('Caption text length exceeds maximum allowed ( 1024 )');
            message_content.image.caption = caption;
        }

        if (message_id) message_content.context = { message_id: message_id };

        return this.sendMessage(message_content);
    }

    public async sendVideoMessage(to_phone: string, video_link: string, caption: string | null = null, message_id: string | null = null) {
        let message_content: WaVideoMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "video",
            image: { link: video_link }
        }

        if (caption) {
            if (caption.length > 1024) throw new InvalidWaMediaMessageObjError('Caption text length exceeds maximum allowed ( 1024 )');
            message_content.image.caption = caption;
        }

        if (message_id) message_content.context = { message_id: message_id };

        return this.sendMessage(message_content);
    }

    public async sendAudioMessage(to_phone: string, audio_link: string, caption: string | null = null, message_id: string | null = null) {
        let message_content: WaAudioMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "audio",
            audio: { link: audio_link }
        }

        if (caption) {
            if (caption.length > 1024) throw new InvalidWaMediaMessageObjError('Caption text length exceeds maximum allowed ( 1024 )');
            message_content.audio.caption = caption;
        }

        if (message_id) message_content.context = { message_id: message_id };

        return this.sendMessage(message_content);
    }

    public async sendDocumentMessage(to_phone: string, document_link: string, caption: string | null = null, message_id: string | null = null) {

        let message_content: WaDocumentMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "document",
            document: { link: document_link }
        }

        if (caption) {
            if (caption.length > 1024) throw new InvalidWaMediaMessageObjError('Caption text length exceeds maximum allowed ( 1024 )');
            message_content.document.caption = caption;
        }

        if (message_id) message_content.context = { message_id: message_id };

        return this.sendMessage(message_content);
    }

    public async sendButtonMessage(
        to_phone: string, buttons: Array<WaButtonInterface>,
        body: string, footer: string | null = null,
        header: WaInteractiveMessageHeaderInterface | null = null,
        message_id: string | null = null) {

        let message_content: WaInteractiveButtonMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "interactive",
            interactive: {
                body: { text: body },
                type: "button",
                action: { buttons: buttons }
            }
        }

        if (header) message_content.interactive.header = header;

        if (footer) message_content.interactive.footer = { text: footer };

        if (message_id) message_content.context = { message_id: message_id };

        this.validateButtonMessageObj(message_content);

        return this.sendMessage(message_content);
    }

    public async sendListMessage(
        to_phone: string,
        list_sections: Array<WaListSectionInterface>,
        body: string,
        button_text: string,
        footer: string | null = null,
        header: WaInteractiveMessageHeaderInterface | null = null,
        message_id: string | null = null) {

        let message_content: WaInteractiveListMessageInterface = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "interactive",
            interactive: {
                body: { text: body },
                type: "list",
                action: {
                    button: button_text,
                    sections: list_sections
                }
            }
        }

        if (header) message_content.interactive.header = header;

        if (footer) message_content.interactive.footer = { text: footer };

        if (message_id) message_content.context = { message_id: message_id };

        this.validateListMessageObj(message_content);

        return this.sendMessage(message_content);
    }

    public async sendReactionMessage(to_phone: string, message_id: string, emoji: string) {
        let message_content = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to_phone,
            type: "reaction",
            reaction: {
                message_id: message_id,
                emoji: emoji //  \uD83D\uDE00
            }
        }

        return this.sendMessage(message_content);
    }

    public async sendLocationMessage(longitude: string, latitude: string, name: string, address: string) {

    }

    public async sendContactMessage() {

    }

    private validateListMessageObj(message: WaInteractiveListMessageInterface) {
        if (message.messaging_product !== 'whatsapp') throw new InvalidWaMessageObjError('Unsupported messaging product');
        if (!message.recipient_type) throw new InvalidWaMessageObjError('Receipient type required!!');

        if (!message.interactive.action.button)
            throw new InvalidWaListMessageObjError('List button text required!!');
        else
            if (message.interactive.action.button.length > 20) throw new InvalidWaListMessageObjError('List button text length exceeds maximum allowed ( 20 )');

        if (!message.interactive.body?.text)
            throw new InvalidWaInteractiveMessageObjError('Interactive Message body is Required for all message types but product');
        if (message.interactive.body?.text)
            if (message.interactive.body.text.length > 1024) throw new InvalidWaInteractiveMessageObjError('Body text length exceeds maximum allowed ( 1024 )');

        if (message.interactive.footer?.text)
            if (message.interactive.footer.text.length > 60) throw new InvalidWaInteractiveMessageObjError('Footer text length exceeds maximum allowed ( 60 )');

        let arr = new Array();
        message.interactive.action.sections.forEach(el => arr = arr.concat(el.rows));

        if (arr.length > 10) throw new InvalidWaListMessageObjError('List elements length exceeds maximum allowed ( 10 )');
        let invalidRowsObj = this.checkListRowObject(arr);
        if (invalidRowsObj.length) throw new InvalidWaListMessageObjError('You have either id or title duplicates in list rows which is not allowed or lengths exceed muximum allowed!! ');
    }

    private validateButtonMessageObj(message: WaInteractiveButtonMessageInterface) {
        if (message.messaging_product !== 'whatsapp') throw new InvalidWaMessageObjError('Unsupported messaging product');
        if (!message.recipient_type) throw new InvalidWaMessageObjError('Receipient type required!!');
        if (!message.interactive.action.buttons) throw new InvalidWaButtonMessageObjError('Invalid buttons object');
        let invalidBtnObj = this.checkButtonListObject(message.interactive.action.buttons);

        if (invalidBtnObj.length) throw new InvalidWaButtonMessageObjError('Invalid buttons object');

        if (!message.interactive.body?.text)
            throw new InvalidWaInteractiveMessageObjError('Interactive Message body is Required for all message types but product');
        if (message.interactive.body?.text)
            if (message.interactive.body.text.length > 1024) throw new InvalidWaInteractiveMessageObjError('Body text length exceeds maximum allowed ( 1024 )');

        if (message.interactive.footer?.text) {
            if (message.interactive.footer.text.length > 60) throw new InvalidWaInteractiveMessageObjError('Footer text length exceeds maximum allowed ( 60 )');
        }
    }

    private checkListRowObject(rows: Array<WaListSectionRow>) {
        return rows.filter((el) => {
            if (rows.filter(ele => ele.id === el.id).length > 1 ||
                rows.filter(ele => ele.title === el.title).length > 1 ||
                el.id.length > 200 || el.description.length > 72 ||
                el.title.length > 24) {
                return true;
            }
        });
    }

    private checkButtonListObject(btns: Array<WaButtonInterface>) {
        return btns.filter((el) => {
            if (!el.reply.id || !el.reply.title ||
                btns.filter(b => b.reply.id === el.reply.id).length > 1 ||
                btns.filter(b => b.reply.title === el.reply.title).length > 1) {
                return true;
            }
        });
    }
}




export class WhatsaAppBusinessProfile {
    messageEndpoint: string;

    constructor(public phone_number_id: string, public access_token: string) {
        this.messageEndpoint = `${WHATSAPP_CLOUD_API_ENDPOINT}/${phone_number_id}/whatsapp_business_profile`;
    }

    public getProfile(fields: Array<string> = []) {
        if (fields.length) {
            this.messageEndpoint = `${this.messageEndpoint}?${fields.join(",")}`
        }
        return fetch(this.messageEndpoint, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.access_token}`
            }
        });
    }

    public updateProfile(params: BusinessProfileParameters) {
        this.validateBusinessProfileParamsObj(params);
        return fetch(this.messageEndpoint, {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.access_token}`
            }
        });
    }

    private validateBusinessProfileParamsObj(params: BusinessProfileParameters) {
        if (!params.messaging_product) throw new InvalidWaBusinessProfileObjError('Messaging product required');

        if (params.websites) {
            if (params.websites.length > 2) throw new InvalidWaBusinessProfileObjError('Only a maximum of two websites is allowed!!');

            let invalidWebsites = params.websites.filter(website => website.length > 256);
            if (invalidWebsites.length) throw new InvalidWaBusinessProfileObjError('Invalid websites object!!');
        }

        if (params.vertical)
            if (!verticalAcceptedValues.includes(params.vertical)) throw new InvalidWaBusinessProfileObjError('Provided vertical not accepted!!');
    }

}


// new WaApi('112852938322447', 'EAAG3zFUlhv0BACdA92DodIroEVx7bkQuoFWk1PkmlVbqfv9Ygi2mZCi3AWTTedTh71CivvMXrOW6TSfnPM3U6zNgz4rz3IkGxpIG5wAZCSnh80x0qudiLZBUqb44kXc0a2V7YAaMilwOge2ZAqDuLuXPhtii1i4epIPq4OSeBVkdzyfxY0GXvZBoaqL4mh4tz7RRBNy3eyQZDZD')
//     .sendImageMessage(
//         '263772393142', 'the body caption of the image text i need it sometimens', 'http://24newsonline.co.zw/wp-content/uploads/2020/02/Job-Sikhala.jpg'
//     )
//     .then((res) => console.log(res))
//     .catch((err) => console.log('my error:', err));


new WaApi('112852938322447', 'EAAG3zFUlhv0BACdA92DodIroEVx7bkQuoFWk1PkmlVbqfv9Ygi2mZCi3AWTTedTh71CivvMXrOW6TSfnPM3U6zNgz4rz3IkGxpIG5wAZCSnh80x0qudiLZBUqb44kXc0a2V7YAaMilwOge2ZAqDuLuXPhtii1i4epIPq4OSeBVkdzyfxY0GXvZBoaqL4mh4tz7RRBNy3eyQZDZD')
    .sendButtonMessage(
        '263772393142', [
        {
            type: 'reply',
            reply: {
                id: 'rrrr',
                title: 'dfdfdv'
            }
        },
        {
            type: 'reply',
            reply: {
                id: 'rrrrf',
                title: 'ddfdfv'
            }
        },
        {
            type: 'reply',
            reply: {
                id: 'rrrrd',
                title: 'ddfdfv'
            }
        }
    ], 'ffffffffff'
    )
    .then((res) => console.log(res))
    .catch((err) => console.log('my error:', err));

    // check message id
