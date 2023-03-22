import { SubmitButton } from '@/components/submit-button';
import { Select, Form, Button, Checkbox, Input } from '@arco-design/web-react';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
const FormItem = Form.Item;

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return 'I came from the About.tsx loader function!';
}

function Component() {
  const data = useLoaderData() as string;
  return (
    <div style={{ height: '10000px' }}>
      <Form style={{ width: 600 }} autoComplete="off">
        <FormItem label="风格">
          <Select placeholder="Please select" style={{ width: 154 }}>
            {options.map((option, index) => (
              <Option key={option} disabled={index === 3} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="风格">
          <Input.TextArea placeholder="please enter your post..." />
        </FormItem>
        <FormItem label="样式">
          <Input.TextArea placeholder="please enter your post..." />
        </FormItem>
      </Form>
      <Button type="primary">Primary</Button>
      <SubmitButton />
    </div>
  );
}

export default Component;
