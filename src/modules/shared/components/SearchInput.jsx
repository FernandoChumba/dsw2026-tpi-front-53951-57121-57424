import Input from './Input';

export default function SearchInput({ label = 'Buscar', ...props }) {
  return <Input {...props} label={label} type="search" />;
}
