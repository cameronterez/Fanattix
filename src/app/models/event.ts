import { Time } from "@angular/common";
import { CategoryObject } from "./category-object";
import { TypeObject } from "./type-object";

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
    lat: number,
    long: number,
}