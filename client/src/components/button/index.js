import style from './style';

export default function Button(props) {
  return <button {...props} class={style.button} />;
}