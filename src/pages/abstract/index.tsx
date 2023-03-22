import { SubmitButton } from '@/components/submit-button';
import { chatService } from '@/services';
import { Select, Form, Button, Checkbox, Input } from '@arco-design/web-react';
import * as React from 'react';
import { useRequest } from 'ahooks';
import { Chat } from '@/components/chat';
import { genAnswer } from '@/mock';
import { IChat } from '@/model';

const FormItem = Form.Item;

const DEFAULT_CHATS: IChat[] = [
  {
    text: '可以帮我生成一份周报吗',
    time: '9h ago',
    reverse: true,
  },
  {
    text: (
      <>
        当然可以！以下是一个简单的周报模板，你可以根据自己的需要进行调整：
        周报（日期范围） 工作总结：
        <br />
        工作项1：在本周，我完成了工作项1，并且达到了预期的目标。我遇到了一些困难，但我通过仔细分析和解决问题，最终取得了成功。
        <br />
        工作项2：在本周，我继续进行工作项2，并取得了进展。我还需要更多的时间和资源来完成这个任务，但我已经采取了措施来确保它能够按时完成。
        <br />
        工作项3：我开始了工作项3，并在本周取得了一些进展。我需要更多的时间和资源来完成这个任务，并计划在下周继续进行。
        <br />
        下周计划：
        <br />
        工作项1：在下周，我计划继续进行工作项1，并尽可能地提高效率和质量。
        <br />
        工作项2：在下周，我将继续努力完成工作项2，并采取措施以确保它能够按时完成。
        <br />
        工作项3：在下周，我将继续进行工作项3，并争取在本周完成它。
        <br />
        需要协调的事项：
      </>
    ),
    time: '9h ago',
  },
];

function Component() {
  // const { data, error, loading } = useRequest(() =>
  //   chatService.genWeekly(
  //     'weekly',
  //     '帮我写一篇周报',
  //     {},
  //     'd3faab44c41211ed9db01831bfb96e81'
  //   )
  // );
  const [chats, setChats] = React.useState<IChat[]>([]);
  const onGeneration = (text: string) => {
    const nextChats = [
      ...chats,
      {
        text,
        time: '9h ago',
        reverse: true,
      },
    ];
    setChats(nextChats);
    genAnswer().then((res: IChat) => {
      setChats([...nextChats, res]);
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <Chat chats={chats} onGeneration={onGeneration} />
    </div>
  );
}

export default Component;
