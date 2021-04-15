import Questions, {
  getServerSideProps as getServerSidePropsQuestions,
} from './questions';

export function getServerSideProps(context) {
  return getServerSidePropsQuestions(context);
}

export default function Home(props) {
  return <Questions {...props} />;
}
