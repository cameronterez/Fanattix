import { Url } from "url";
import { FxEvent } from "./event";

export class TicketOption{
    name: String
    url: Url
    price: Number
    number_total: Number
    event: Number
    event_detail: FxEvent
}