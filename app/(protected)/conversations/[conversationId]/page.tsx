import { getMessages } from '@/actions/get-messages';

import { Header } from './components/header';
import { Body } from './components/body';
import { Form } from './components/form';
import { EmptyState } from '@/components/utils/empty-state';

interface IParams {
  conversationId: string;
}

async function ConversationIdPage({ params }: { params: IParams }) {
  const messages = await getMessages(params.conversationId);
  if (!params.conversationId) {
    return (
      <div className="h-full  lg:pl-[28rem]">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute w-screen lg:w-auto lg:relative bg-background dark:bg-black h-screen lg:pl-[28rem]">
      <div className="flex h-full   flex-col ">
        <Header conversationId={params.conversationId} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}

export default ConversationIdPage;
