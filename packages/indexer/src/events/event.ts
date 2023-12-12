import { handleEventReturn } from '@archisinal/typechain-types';
import { getEventTypeDescription } from '@archisinal/contracts/typechain-generated/shared/utils';
export async function convertEvent(
  event: { inputs: any[]; values: any[] },
  eventIdent: string,
  dataDescriptions: any,
): Promise<Record<string, any>> {
  const _event: Record<string, any> = {};

  for (let i = 0; i < event.inputs.length; i++) {
    _event[event.inputs[i]!.name] = event.values[i]!.toJSON();
  }

  return handleEventReturn(
    _event,
    getEventTypeDescription(eventIdent, dataDescriptions),
  );
}
