// This file holds the Genkit flow for suggesting interests and skills based on profile information.

'use server';

/**
 * @fileOverview Flow for suggesting interests and skills based on profile information.
 *
 * - suggestInterests - A function that suggests interests and skills.
 * - SuggestInterestsInput - The input type for the suggestInterests function.
 * - SuggestInterestsOutput - The output type for the suggestInterests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInterestsInputSchema = z.object({
  bio: z.string().describe('A short biography of the user.'),
  interests: z.array(z.string()).describe('The interests of the user.'),
  skills: z.array(z.string()).describe('The skills of the user.'),
});

export type SuggestInterestsInput = z.infer<typeof SuggestInterestsInputSchema>;

const SuggestInterestsOutputSchema = z.object({
  suggestedInterests: z.array(z.string()).describe('Suggested interests for the user.'),
  suggestedSkills: z.array(z.string()).describe('Suggested skills for the user.'),
});

export type SuggestInterestsOutput = z.infer<typeof SuggestInterestsOutputSchema>;

export async function suggestInterests(input: SuggestInterestsInput): Promise<SuggestInterestsOutput> {
  return suggestInterestsFlow(input);
}

const suggestInterestsPrompt = ai.definePrompt({
  name: 'suggestInterestsPrompt',
  input: {schema: SuggestInterestsInputSchema},
  output: {schema: SuggestInterestsOutputSchema},
  prompt: `You are an AI assistant helping users complete their profile by suggesting interests and skills.

  Suggest additional interests and skills based on the following information:

  Biography: {{{bio}}}
  Existing Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Existing Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Return the suggestions in JSON format.
  `,
});

const suggestInterestsFlow = ai.defineFlow(
  {
    name: 'suggestInterestsFlow',
    inputSchema: SuggestInterestsInputSchema,
    outputSchema: SuggestInterestsOutputSchema,
  },
  async input => {
    const {output} = await suggestInterestsPrompt(input);
    return output!;
  }
);
