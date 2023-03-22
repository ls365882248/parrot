import { Chat } from '@/components/chat';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';

function Component() {
  const data = useLoaderData() as string;

  return (
    <div>
      <Chat chats={[]} />
    </div>
  );
}
export default Component;
