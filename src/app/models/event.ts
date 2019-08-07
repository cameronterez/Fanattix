import { Time } from "@angular/common";
import { CategoryObject } from "./category-object";
import { TypeObject } from "./type-object";
import { TicketOption } from "./ticket-option";

export interface FxEvent{
    id: number,
    name: String,
    description: string,
    date: String
    time: String,
    location: String,
    image: String,
    organizers: String
    category_obj: CategoryObject,
    type_obj: TypeObject,
    ticket_options: TicketOption[]
    lat: number,
    long: number,
    type_detail: any,
    category_detail: any,
    is_inactive: boolean,
    occurrences: any[],
    total_tickets_sold: any,
    results: any,
}