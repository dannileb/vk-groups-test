interface ListProps<T> {
  items: T[];
  renderItem: (item: T, id: number) => React.JSX.Element;
  className?: string;
}

export default function List<T>(props: ListProps<T>) {
  return (
    <ul className={props.className}>{props.items.map(props.renderItem)}</ul>
  );
}
