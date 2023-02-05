import Link from 'next/link';
import { Button } from './';

type Props = {
  path: string;
  text: string;
};

export const LinkButton = (props: Props) => {
  return (
    <>
      <Link href={props.path} passHref>
        <Button text={props.text}></Button>
      </Link>
    </>
  );
};
export default LinkButton;
