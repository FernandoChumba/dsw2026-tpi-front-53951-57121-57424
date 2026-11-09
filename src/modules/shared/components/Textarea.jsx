import Field from './Field';

export default function Textarea({ rows = 4, ...props }) {
  return <Field {...props} as="textarea" rows={rows} />;
}
