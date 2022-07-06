import tx from 'twin.macro';
import { BaseButton } from 'base-component';

const Wrapper = tx.div`
  bg-blue-300
  p-4
`;

const App = () => {
  return (
    <Wrapper>
      <BaseButton>hello</BaseButton>
    </Wrapper>
  );
};

export default App;
