import { useCallback, useState } from "react";
import { Muse, postMuse } from "../../../../services/muse";

interface PostBoxProps {
  onPost: (muse: Muse) => void;
}
export default function PostBox(props: PostBoxProps) {
  const [ pending, setPending ] = useState(false);

  const onPost = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const formEle = e.currentTarget;
      const formdata = new FormData(formEle);
      const data = {
        sticky: false,
        status: 0,
        origin: "Web",
        content: "",
      };
      for (const [key, value] of formdata.entries()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data[key] = value;
      }
      if (!data.content) {
        return;
      }

      setPending(true);
      const resp = await postMuse(data);
      props.onPost(resp);
      setPending(false);
      formEle.reset();
    },
    [props.onPost]
  );

  return (
    <div className="post-box">
      <form className="pure-form" onSubmit={onPost}>
        <fieldset className="pure-group">
          <textarea
            rows={5}
            name="content"
            className="pure-input-1"
            placeholder="请输入内容..."
          ></textarea>
        </fieldset>
        <button
          type="submit"
          disabled={pending}
          className="pure-button pure-input-1-5 pure-button-primary"
        >
          发布
        </button>
      </form>
    </div>
  );
}
