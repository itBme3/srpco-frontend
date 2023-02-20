/* eslint-disable camelcase */
import 'dotenv/config';
export type UniversalCategory = "form submit" | "Phone" | "Email";
export const track = (action: string, params: { category: UniversalCategory; label: string; value?: any } & Record<string, any>, ids: { g4: string; gu: string}, $gtag: any): void => {
	const { category: uCategory, value, label: event_label, ...additional } = params;
	const g4Category = ["Phone", "Email"].includes(uCategory) ? "contact us" : uCategory === "form submit" ? "contact us" : uCategory;
	const g4Action: string = uCategory === "form submit"
		? "generate_lead"
		: uCategory === "Phone"
			? "button_click_phone"
			: uCategory === "Email"
				? "button_click_email"
				: uCategory;
	$gtag.event(g4Action, {
		send_to: ids.g4,
		event_category: g4Category,
		event_label,
		value,
		...additional,
	});
	$gtag.event(action, {
		send_to: ids.gu,
		event_category: uCategory,
		event_label,
		value,
		...additional,
	});
}