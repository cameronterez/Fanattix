import { Url } from "url";

export class User{
    id: Number
    username: String
    first_name: String
    last_name: String
    email: Url
    is_staff: Boolean
    is_active: Boolean
    profile_img: Url
    receives_emails: boolean
    receives_emails_from_organizers: boolean
}