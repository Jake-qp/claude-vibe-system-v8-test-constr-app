import { CrewMember } from './types';

export const CREW_MEMBERS: CrewMember[] = [
  { id: 'mike', name: 'Mike', role: 'Lead Carpenter' },
  { id: 'jose', name: 'Jose', role: 'Apprentice' },
  { id: 'tony', name: 'Tony', role: 'Plumber' },
  { id: 'sarah', name: 'Sarah', role: 'Electrician' },
  { id: 'dave', name: 'Dave', role: 'General Labor' },
  { id: 'pete', name: 'Pete', role: 'Owner' },
];

export function getCrewMember(id: string): CrewMember | undefined {
  return CREW_MEMBERS.find((m) => m.id === id);
}

export function getCrewMemberName(id: string): string {
  return getCrewMember(id)?.name ?? 'Unknown';
}
