import { Button, Group, Modal, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

type CreateTimerFormFields = {
  timerName: string;
  originDateTime: dayjs.Dayjs;
};

type CreateTimerModalProps = {
  opened: boolean;
  close: () => void;
  onSubmit: (formValues: CreateTimerFormFields) => void;
};

export const CreateTimerModal = ({
  opened,
  close,
  onSubmit,
}: CreateTimerModalProps) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      timerName: '',
      originDateTime: dayjs().toDate(),
    },
    transformValues: (values) => ({
      ...values,
      originDateTime: dayjs(values.originDateTime),
    }),

    validate: {
      timerName: (value) => (value ? null : 'Invalid timer name'),
      originDateTime: (value) =>
        dayjs(value).isValid() ? null : 'Invalid origin date time',
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create Timer"
      keepMounted={false}
    >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          label="Timer name"
          placeholder="Days Since XXX"
          size="md"
          {...form.getInputProps('timerName')}
        />
        <DateTimePicker
          withSeconds
          label="Start datetime"
          placeholder="Start datetime"
          valueFormat="MMM DD YYYY hh:mm:ss A"
          style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
          size="md"
          mt={'md'}
          {...form.getInputProps('originDateTime')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};
