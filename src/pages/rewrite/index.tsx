import { Chat } from '@/components/chat';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return 'I came from the About.tsx loader function!';
}

function Component() {
  const data = useLoaderData() as string;

  return (
    <div>
      <Chat chats={[]} />
    </div>
  );
}

export default Component;
