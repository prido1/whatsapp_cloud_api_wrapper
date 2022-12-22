# WhatsApp Cloud Api Wrapper

### To send a message
```typescript
import { WaApi, WhatsaAppBusinessProfile } from "./scr/whatsAppCloudApi";

let waApi = new WaApi('PHONE_NUMBER_ID', 'ACCESS_TOKEN');

// sending a message
waApi.sendTextMessage('to_number', 'text_body').then().catch()

// send image message
waApi.sendImageMessage('to_phone', 'img_link', 'caption').then().catch()

// send audio message
waApi.sendAudioMessage('to_phone', 'audio_link', 'caption').then().catch()

// send document message
waApi.sendDocumentMessage('to_phone', 'document_link', 'caption').then().catch()

// send reaction message
waApi.sendReactionMessage('to_phone', 'message_id', 'emoji').then().catch()

// send buttons message
// waApi.sendListMessage('to_phone', lsit: Array<WaButtonInterface>, 'body', 'footer text')
waApi.sendButtonMessage('to_phone', 
[
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
],
'body text', 'footer text'
).then().catch();

// send list message
// waApi.sendListMessage('to_phone', lsit: Array<WaProductListSectionInterface>, 'list body', 'list btn text')
waApi.sendListMessage('to_phone',
[
    {
        title: 'List title',
        rows: [
            {
                id: 'unique_id_within_list',
                title: 'unique_title_within_list',
                description: 'description'
            },
            {
                id: 'unique_id_within_list',
                title: 'unique_title_within_list',
                description: 'description'
            },

        ]
    },
    {
        title: 'List title',
        rows: [
            {
                id: 'unique_id_within_list',
                title: 'unique_title_within_list',
                description: 'description'
            },
            {
                id: 'unique_id_within_list',
                title: 'unique_title_within_list',
                description: 'description'
            },

        ]
    }
],
'list body text', 'list button text').then().catch()


```


### Profile functions
```typescript


let waBusinessProfile = new WhatsaAppBusinessProfile('PHONE_NUMBER_ID', 'ACCESS_TOKEN');


// get profile info 
waBusinessProfile.getProfile(['about', 'description']).then().catch();

// update profile
// waBusinessProfile.updateProfile(params: BusinessProfileParameters)
waBusinessProfile.updateProfile(
    {
        about: 'my about',
        address: 'my busines address',
        messaging_product: 'whatsapp'
    }
).then().catch();

```

I have made interfaces to type the received notifications from whatsapp

```typescript

function webHook(message: WaNotificationInterface){}

```
This wrapper also throws errors when you try to send wrong message objects and exceeding max allowed characters etc.

This is a simple wrapper to handle basic WhatsApp Cloud Api calls. This wrapper is no where near perfect, was created in just a few hours and anyone who wishes to contribute is welcome.
