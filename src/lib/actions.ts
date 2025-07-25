'use server';

import { suggestInterests, type SuggestInterestsInput } from '@/ai/flows/suggest-interests';

export async function suggestInterestsAction(input: SuggestInterestsInput) {
  try {
    const output = await suggestInterests(input);
    return {
      success: true,
      suggestions: output,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Failed to generate suggestions. Please try again.',
    };
  }
}
