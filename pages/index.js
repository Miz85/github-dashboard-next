// import Link from "next/link";
import { Button } from 'components/Button/Button';

export default () => (
  <>
    <h1>Next Sandbox</h1>
    <div>
      <span>Getting depoyed...</span>
      <Button
        onClick={() => {
          console.log('clicked!');
        }}
      >
        Toto
      </Button>
    </div>
  </>
);
