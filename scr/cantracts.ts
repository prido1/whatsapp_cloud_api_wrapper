
export interface WaMessageInterface {
    context?: {
        message_id: string
    },
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: string,
    type: "text" | "reaction" | "audio" | "contacts" | "document" | "image" | "video" | "interactive" | "location" | "sticker" | "template",
}

export interface WaImageMessageInterface extends WaMessageInterface {
    type: 'image',
    image: WaMediaObjectInterface
}

export interface WaVideoMessageInterface extends WaMessageInterface {
    type: 'video',
    image: WaMediaObjectInterface
}

export interface WaDocumentMessageInterface extends WaMessageInterface {
    type: 'document',
    document: WaMediaObjectInterface
}

export interface WaAudioMessageInterface extends WaMessageInterface {
    type: 'audio',
    audio: WaMediaObjectInterface
}

export interface WaStickerMessageInterface extends WaMessageInterface {
    type: 'sticker',
    sticker: WaMediaObjectInterface //  A static sticker needs to be 512x512 pixels and cannot exceed 100 KB. An animated sticker must be 512x512 pixels and cannot exceed 500 KB
}

export interface WaTextMessageInterface extends WaMessageInterface {
    preview_url?: boolean, // Allows for URL previews in text messages
    type: "text",
    text: {
        body: string,
        preview_url?: boolean
    }
}

export interface WaTemplateMessageInterface extends WaMessageInterface {
    template: {
        name: string,
        language: {
            policy: "deterministic",
            code: string
        }
    }
}

export interface WaLocationMessageInterface extends WaMessageInterface {
    location: {
        longitude: string,
        latitude: string,
        name?: string,
        address?: string
    }
}

export interface WaInteractiveMessageInterface extends WaMessageInterface {
    type: 'interactive'
}

export interface WaInteractiveProductListMessageInterface extends WaInteractiveMessageInterface {
    interactive: {
        action: {
            sections: Array<WaProductListSectionInterface>,
            catalog_id: string,
        },
        body: {
            text: string //  Required if body is present. The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters.
        }, // Optional for type product. Required for other message types.
        footer?: {
            text: string // The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters.
        },
        header: WaInteractiveMessageHeaderInterface, // Required for type product_list. Optional for other types. Header content displayed on top of a message. You cannot set a header if your interactive object is of product type
        type: "product_list"
    }
}


export interface WaInteractiveButtonMessageInterface extends WaInteractiveMessageInterface {
    interactive: {
        action: {
            buttons: Array<WaButtonInterface>,
        },
        body: {
            text: string //  Required if body is present. The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters.
        }, // Optional for type product. Required for other message types.
        footer?: {
            text: string // The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters.
        },
        header?: WaInteractiveMessageHeaderInterface, // Required for type product_list. Optional for other types. Header content displayed on top of a message. You cannot set a header if your interactive object is of product type
        type: "button"
    }
}

export interface WaInteractiveSinlgeProductMessageInterface extends WaInteractiveMessageInterface {
    interactive: {
        action: {
            catalog_id: string,
            product_retailer_id: string
        },
        body?: {
            text: string //  Required if body is present. The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters.
        }, // Optional for type product. Required for other message types.
        footer?: {
            text: string // The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters.
        },
        header?: WaInteractiveMessageHeaderInterface, // Required for type product_list. Optional for other types. Header content displayed on top of a message. You cannot set a header if your interactive object is of product type
        type: "product"
    }
}

export interface WaInteractiveListMessageInterface extends WaInteractiveMessageInterface {
    interactive: {
        action: {
            sections: Array<WaListSectionInterface>,
            button: string // 20 chars
        },
        body: {
            text: string //  Required if body is present. The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters.
        }, // Optional for type product. Required for other message types.
        footer?: {
            text: string // The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters.
        },
        header?: WaInteractiveMessageHeaderInterface, // Required for type product_list. Optional for other types. Header content displayed on top of a message. You cannot set a header if your interactive object is of product type
        type: "list"
    }
}

export interface WaInteractiveMessageHeaderInterface {
    document?: WaMediaObjectInterface, // Required if type is set to document.
    image?: WaMediaObjectInterface, // Required if type is set to document.
    text?: string, // Required if type is set to document.
    video?: WaMediaObjectInterface, // Required if type is set to document.
    type: "document" | "image" | "text" | "video",
}

export interface WaMediaObjectInterface {
    id?: string,
    link?: string,
    caption?: string, //  limited to 1024 characters.
    filename?: string,
    provider?: string,

}

export interface WaButtonInterface {
    type: 'reply',
    reply: {
        id: string,
        title: string //  It cannot be an empty string and must be unique within the message
    }

}

export interface WaListSectionRow {
    id: string, //200 chars
    title: string, //24 chars
    description: string, // 72 chars
}

export interface WaListSectionInterface {
    rows: Array<WaListSectionRow>, // limit 10 rows
    title?: string // 24 chars
}

export interface WaProductListSectionRow {
    product_retailer_id: string,
}

export interface WaProductListSectionInterface {
    title: string,
    product_items: Array<WaProductListSectionRow>
}







// Message notification interfaces


export interface WaNotificationMessageInterface {
    from: string,
    id: string,
    timestamp: string,
    type: 'text' | 'reaction' | 'image' | 'sticker' | 'unknown' | 'button' | 'list_reply' | 'button_reply'
}

export interface WaNotificationTextMessageInterface extends WaNotificationMessageInterface {
    text: {
        body: string
    }
}

export interface WaNotificationReactionMessageInterface extends WaNotificationMessageInterface {
    reaction: {
        message_id: string,
        emoji: string
    },
}

export interface WaNotificationMediaMessageInterface extends WaNotificationMessageInterface {
    caption: string,
    mime_type: string,
    sha256: string,
    id: string
}

export interface WaNotificationImageMessageInterface extends WaNotificationMessageInterface {
    image: WaNotificationMediaMessageInterface
}

export interface WaNotificationVideoMessageInterface extends WaNotificationMessageInterface {
    video: WaNotificationMediaMessageInterface
}

export interface WaNotificationAudioMessageInterface extends WaNotificationMessageInterface {
    audio: WaNotificationMediaMessageInterface
}

export interface WaNotificationDocumentMessageInterface extends WaNotificationMessageInterface {
    document: WaNotificationMediaMessageInterface
}

export interface WaNotificationStickerMessageInterface extends WaNotificationMessageInterface {
    sticker: {
        mime_type: string,
        sha256: string,
        id: string
    }
}

export interface WaNotificationUnkownMessageInterface extends WaNotificationMessageInterface {
    errors: [
        {
            code: string,
            details: string,
            title: string
        }]
}

export interface WaNotificationLocationMessageInterface extends WaNotificationMessageInterface {
    location: {
        latitude: string,
        longitude: string,
        name: string,
        address: string,
    }
}

export interface WaNotificationQReplyButtonMessageInterface extends WaNotificationMessageInterface {
    context: {
        from: string,
        id: string
    },
    button: {
        text: string,
        payload: string
    }
}

export interface WaNotificationListReplyMessageInterface extends WaNotificationMessageInterface {
    interactive: {
        list_reply: {
            id: string,
            title: string,
            description: string
        },
        type: string
    }
}

export interface WaNotificationButtonReplyMessageInterface extends WaNotificationMessageInterface {
    interactive: {
        button_reply: {
            id: string,
            title: string,
        },
        type: string
    }
}

export interface WaNotificationInterface {
    object: string,
    entry: [{
        id: string,
        changes: [{
            value: {
                messaging_product: string,
                metadata: {
                    display_phone_number: string,
                    phone_number_id: string
                },
                contacts: [{
                    profile: {
                        name: string
                    },
                    wa_id: string
                }],
                messages: Array<
                    WaNotificationTextMessageInterface | WaNotificationReactionMessageInterface | WaNotificationImageMessageInterface |
                    WaNotificationVideoMessageInterface | WaNotificationAudioMessageInterface | WaNotificationDocumentMessageInterface |
                    WaNotificationDocumentMessageInterface | WaNotificationUnkownMessageInterface | WaNotificationLocationMessageInterface |
                    WaNotificationQReplyButtonMessageInterface | WaNotificationListReplyMessageInterface | WaNotificationButtonReplyMessageInterface
                >
            },
            field: string
        }]
    }]

}

export let verticalAcceptedValues = ['UNDEFINED' , 'OTHER' , 'AUTO' , 'BEAUTY' , 'APPAREL' , 'EDU' ,
'ENTERTAINMENT' , 'EVENT_PLAN' , 'FINANCE' , 'GROCERY' , 'GOVT' , 'HOTEL' ,
'HEALTH' , 'NONPROFIT' , 'PROF_SERVICE' , 'RETAIL' , 'TRAVEL' , 'RESTAURANT' , 'NOT_A_BIZ'];

export interface BusinessProfileParameters {
    about?: string,
    address?: string,
    description?: string,
    email?: string,
    messaging_product: string // always set to 'whatsapp' if using the WhatsApp Business Api
    profile_picture_handle?: string,
    vertical?: 'UNDEFINED' | 'OTHER' | 'AUTO' | 'BEAUTY' | 'APPAREL' | 'EDU' |
    'ENTERTAINMENT' | 'EVENT_PLAN' | 'FINANCE' | 'GROCERY' | 'GOVT' | 'HOTEL' |
    'HEALTH' | 'NONPROFIT' | 'PROF_SERVICE' | 'RETAIL' | 'TRAVEL' | 'RESTAURANT' | 'NOT_A_BIZ'
    websites?: Array<string> // 2 elements max, 256 chars length
}
