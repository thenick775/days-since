import { Button, Group, Modal, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

type CreateTrackerFormFields = {
  trackerName: string;
  originDateTime: dayjs.Dayjs;
};

type CreateTrackerModalProps = {
  opened: boolean;
  close: () => void;
  onSubmit: (formValues: CreateTrackerFormFields) => void;
};

type TrackerFormProps = {
  close: () => void;
  onSubmit: (formValues: CreateTrackerFormFields) => void;
};

const TrackerForm = ({ onSubmit, close }: TrackerFormProps) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      trackerName: '',
      originDateTime: dayjs().toDate(),
    },
    transformValues: (values) => ({
      ...values,
      originDateTime: dayjs(values.originDateTime),
    }),

    validate: {
      trackerName: (value) => (value ? null : 'Invalid tracker name'),
      originDateTime: (value) =>
        dayjs(value).isValid() ? null : 'Invalid origin date time',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        close();
      })}
    >
      <TextInput
        label="Tracker name"
        placeholder="Days Since XXX"
        size="md"
        {...form.getInputProps('trackerName')}
      />
      <DateTimePicker
        withSeconds
        label="Start datetime"
        placeholder="Start datetime"
        valueFormat="MMM DD YYYY hh:mm:ss A"
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
        size="md"
        mt="md"
        dropdownType="modal"
        {...form.getInputProps('originDateTime')}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export const CreateTrackerModal = ({
  opened,
  close,
  onSubmit,
}: CreateTrackerModalProps) => (
  <Modal
    opened={opened}
    onClose={close}
    title="Create Tracker"
    keepMounted={false}
  >
    <TrackerForm onSubmit={onSubmit} close={close} />
  </Modal>
);
