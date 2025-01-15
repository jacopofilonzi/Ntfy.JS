# Ntfy.JS
A client for Ntfy.sh in Node.js

> **Disclaimer:** This project is not an official project of Ntfy.sh. It is an independent client developed for use with Ntfy.sh.


**Summary:**
- [Setup](#setup)
- [Publishing messages](#publishing-messages)
    - [Actions](#actions)
    - [Attachments](#attachments)
- [Topic subscriptions](#subscribing-to-topics)
    - [Subscribe on declaration](#subscription-on-constructor)
    - [Subscribe after declaration](#subscription-with-methods)
    - [Unsubscribing](#unsubscrbe-from-topics)
    - [Subscribed topics](#get-subscribed-topic-list)
    - [Listen for all subscribed topics](#listen-to-all-topics)
    - [Listen for specific topic](#listen-to-specific-topic)

# Setup
Define the class builder

```typescript
import Ntfy from "ntfy.js"

//Clean setup
const ntfy = new Ntfy()

//Enriched setup
const ntfy = new Ntfy({
    host?: "",
    topic?: ""
    credentials?: {
        username: "",
        password: ""
    }
    authToken?: ""
    subscriptionsOptions?: []
    ]
})
```

## Options
- `host: string`: Default host that will be used for connection when no host is specified
- `topic: string`: Default topic that will be used when not specified
- `credentials: {username: string, password: string}`: If topics are protected by authentication you will need to use this or authToken
- `authToken: string` If topics are protected by authentication you will need to use this or credentials
- `subscriptionsOptions: subscriptionOptions[]`: Subscribe to topics when the class get created (you can do it later by doing `ntfy.subscribe({...})`)


# Publishing messages
```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

ntfy.send({
    content: string;
    host?: string;
    topic?: string;
    title?: string;
    priority?: Priority;
    link?: URL;
    iconURL?: URL
    attachment?: URL | fileAttachment
    actions?: action[]
    delay?: EpochTimeStamp
    emoji?: string[]
    email?: string
    phoneNumber?: string
})
```


### Options
- `content: string`: Message that you are sending
- `host: string`: Define a different host address than the one declared in the constructor
- `topic: string`: Define a different topic than the one defined in the builder
- `title: string`: Define a title for the message
- `priority: Priority` A number from $1$ to $5$ wich defines the priority of the alert notification
- `link: URL`: Define a link that will be clickable in the notification
- `delay: EpochTimeStamp`: Define whith a timestamp the exact date/time when the notification alert will be fired
- `emoji: string[]`: see [ntfy docs](https://docs.ntfy.sh/emojis/) for cheetsheat
- `email: string`: send a replica of the notification via email
- `phoneNumber: string`: call a phone number whith a robot vocal notification


> NOTE: email service need a configured smtp server, see [ntfy docs](https://docs.ntfy.sh/publish/#e-mail-notifications)

>NOTE: phone calls need a configured Twillo account, see [ntfy docs](https://docs.ntfy.sh/publish/#phone-calls)

### Actions

with actions you can create clickable buttons wich leads to custom actions

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

ntfy.send({
    ...,
    actions: [
        {
            type: "view"
            label: "Lorem"
            args: [
                "https://google.com"
            ]
        },
        {
            type: "http"
            label: "Ipsum",
            args: [
                ...
            ]
        },
        {
            type: "broadcast"
            label: "Dolor",
            args: [
                ...
            ]
        }
    ],
    ...
})
```

>NOTE: See [ntfy docs](https://docs.ntfy.sh/publish/#action-buttons) to know what to specify in args <br>args will be concatenated in the resulting string


### Attachments
whith attachments you can send files in the notification

```typescript
import * as fs from "fs"
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

//Using file in the web
ntfy.send({
    ...,
    attachment: new URL("http[s]://my.domain.com/path/to/file.anytype")
    ...
})

//Uploading local files
ntfy.send({
    ...,
    attachment: {
        filename: "myFile.txt",
        buffer: fs.createReadStream("C:/path/to/myFile.txt")
    },
    ...
})
```

> NOTE: for the maximum file size [edit your configurations](https://docs.ntfy.sh/config/#attachments) in the server or upgrade for a better plan on [ntfy](https://ntfy.sh/#pricing)

# Topic subscriptions
Ntfy.JS allow you to not only send messages but also have an EventEmitter wich will be triggered when a new message is published in certain topic

## Subscription on constructor
By default you can automatically subscribe to topics via the constructor as shown

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({
    ...,
    subscriptionOptions: [
        {
            topic?: "MyWonderfulTopic",
            host?: "https://ntfy.sh",
            credentials?: {
                username: "john"
                pasword: "Doe123"
            },
            authToken?: "token";
        }
    ]
})
```

### Options
- `[topic: string]`: Topic to be subscribed to, if not defined the default topic will be used
- `[host: string]`: Host wich the topic is situated into, if not defined the default host will be used
- `credentials: {username: string, password: string}`: If topics are protected by authentication you will need to use this or authToken
- `authToken: string` If topics are protected by authentication you will need to use this or credentials

## Subscription with methods
You can subscribe to topics after the class get declared using the following method

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

ntfy.subscribe({
    topic?: "MyWonderfulTopic",
    host?: "https://ntfy.sh",
    credentials?: {
        username: "john"
        pasword: "Doe123"
    },
    authToken?: "token";
})
```

## Unsubscrbe from topics

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

//Unsubscribe from a specific topic
ntfy.unsibscribe("MyWonderfulTopic")

//Unsubscribe from all topics
ntfy.unsubscribeAll()
```

## Get subscribed topic list

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

const myTopics = ntfy.getSubscriptions()
//myTopics = ["MyWonderfulTopic1", "topic2", ...]
```

## Listen to all topics
this event will be triggered when one of all topics you are subscribed to gets a new message

```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

ntfy.on("message", (topic: string, data: ntfyResponse) => {

})

```

## Listen to specific topic
this event will be triggered when the specified topic via `"topic:<topic name>"` gets a new message
```typescript
import Ntfy from "ntfy.js"

const ntfy = new Ntfy({...})

ntfy.on("topic:MyWonderfulTopic", (data: ntfyResponse) => {

})
```