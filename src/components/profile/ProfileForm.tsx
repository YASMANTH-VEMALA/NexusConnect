'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, LoaderCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/lib/types';
import { suggestInterestsAction } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { SuggestInterestsOutput } from '@/ai/flows/suggest-interests';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  college: z.string(),
  classYear: z.string(),
  bio: z.string().max(200, { message: 'Bio must not be longer than 200 characters.' }),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  personality: z.enum(['Introvert', 'Extrovert', 'Ambivert']).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestInterestsOutput | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      college: user.college,
      classYear: user.classYear,
      bio: user.bio,
      skills: user.skills,
      interests: user.interests,
      personality: user.personality,
    },
    mode: 'onChange',
  });

  const handleSuggest = async () => {
    setIsSuggesting(true);
    setSuggestions(null);
    const bio = form.getValues('bio');
    const result = await suggestInterestsAction({
      bio,
      skills: form.getValues('skills'),
      interests: form.getValues('interests'),
    });

    if (result.success && result.suggestions) {
      setSuggestions(result.suggestions);
    } else {
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: result.error,
      });
    }
    setIsSuggesting(false);
  };
  
  const addTag = (type: 'skills' | 'interests', value: string) => {
    const currentValues = form.getValues(type);
    if (!currentValues.includes(value)) {
        form.setValue(type, [...currentValues, value], { shouldDirty: true });
    }
  }

  const removeTag = (type: 'skills' | 'interests', value: string) => {
    const currentValues = form.getValues(type);
    form.setValue(type, currentValues.filter(v => v !== value), { shouldDirty: true });
  }


  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
    console.log(data);
    router.push('/profile');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <FormControl>
                      <Input placeholder="Your College/University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class/Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a great place to showcase your personality and goals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="personality"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Personality Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Introvert" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Introvert
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Extrovert" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Extrovert
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Ambivert" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ambivert
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Help others understand your collaboration style.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="button" onClick={handleSuggest} disabled={isSuggesting}>
                {isSuggesting ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Suggest with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {isSuggesting && (
             <Card>
                <CardContent className="p-6 text-center">
                    <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Generating suggestions...</p>
                </CardContent>
            </Card>
        )}

        {suggestions && (
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-primary">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Suggested Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.suggestedSkills.map(skill => (
                                <Button key={skill} type="button" variant="outline" size="sm" onClick={() => addTag('skills', skill)}>
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold mb-2">Suggested Interests</h3>
                        <div className="flex flex-wrap gap-2">
                             {suggestions.suggestedInterests.map(interest => (
                                <Button key={interest} type="button" variant="outline" size="sm" onClick={() => addTag('interests', interest)}>
                                    {interest}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Skills & Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                   <FormControl>
                     <div className="p-2 border rounded-md min-h-20 flex flex-wrap gap-2">
                       {field.value.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-base">
                          {skill}
                           <button type="button" onClick={() => removeTag('skills', skill)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                             <X className="h-3 w-3" />
                           </button>
                        </Badge>
                       ))}
                     </div>
                   </FormControl>
                  <FormDescription>
                    Add skills that showcase your expertise.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <div className="p-2 border rounded-md min-h-20 flex flex-wrap gap-2">
                       {field.value.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-base">
                          {interest}
                           <button type="button" onClick={() => removeTag('interests', interest)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                             <X className="h-3 w-3" />
                           </button>
                        </Badge>
                       ))}
                     </div>
                   </FormControl>
                  <FormDescription>
                    List some things you are passionate about.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
