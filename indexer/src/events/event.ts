import {handleEventReturn} from "@727-ventures/typechain-types";
import {getEventTypeDescription} from "../../typechain-generated/shared/utils";

export interface DotEvent {
    data: Uint8Array;
    target: string;
}

export async function convertEvent (event: {inputs: any[], values: any[]}, eventIdent: string, dataDescriptions: any): Promise<Record<string, any>> {
    const _event: Record < string, any > = {};

    for (let i = 0; i < event.inputs.length; i++) {
        _event[event.inputs[i]!.name] = event.values[i]!.toJSON();
    }

    return handleEventReturn(_event, getEventTypeDescription(eventIdent, dataDescriptions));
}
