'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { determineSteamID } from "@/utils/isSteam64ID";
import Link from "next/link";
import { Fragment } from "react";
import { Footer } from "@/components/ui/footer";

const schema = z.object({
  steamId: z.string().min(2, {
    message: 'Steam ID must be at least 1 character.'
  })
})

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      steamId: "",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    const userId = determineSteamID(data.steamId);
    return router.push(`/wishlist/${userId}`);
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center flex-col min-h-screen font-sans ml-4 mr-4">
        <section className="flex flex-col gap-1 items-center text-center">
          <h1 className="font-mono text-2xl text-center">Random Steam Wishlist Game Picker</h1>
          <p className="text-center text-white/60">Selects a random game from the provided user's wishlist*.</p>
          <p className="mt-2 text-white/50 text-sm text-wrap">*Your Steam Profile must be set to Public in order for this to work properly.</p>

          <section className="w-full mt-5 flex items-center flex-col">
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="steamId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="bg-black text-white" placeholder="Enter your vanity URL or Steam ID." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-3 bg-white text-black hover:bg-white" type="submit">I'm feeling lucky</Button>
              </form>
            </Form>
          </section>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
}