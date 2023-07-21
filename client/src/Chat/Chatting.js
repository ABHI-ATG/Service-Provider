import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import url from "../url";

const Chatting = () => {
  const {
    dispatch,
    state: { user, provider, message, chat },
  } = useContext(userContext);
  const [content, setContent] = useState("");

  const create = async () => {
    try {
      const { data } = await axios.post(
        `${url}/api/client/create`,
        {
          user: user.id,
          provider: provider._id,
        },
        {
          method: "POST",
          headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "create", payload: data._id });
      dispatch({
        type: "chat",
        payload: {
          chatId: data._id,
          message: [],
          puser: 0,
          latest: "Say Hi!",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let present;
    if (message.length) {
      present = message.some((obj) => {
        if (obj.provider === provider._id) {
          dispatch({ type: "chat", payload: obj });
          return true;
        }
        return false;
      });
    }
    console.log(present);
    if (!present) {
      create();
    }
  }, []);

  const send = async () => {
    if (content !== "") {
      try {
        const data = await axios.post(
          `${url}/api/client/send`,
          {
            chatId: chat._id,
            sender: 1,
            content: content,
          },
          {
            method: "POST",
            headers: {
              Authorization: user.token,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({
          type: "message",
          payload: {
            id: chat._id,
            sender: 1,
            content: content,
          },
        });
        dispatch({
          type: "chatMessage",
          payload: {
            sender: 1,
            content: content,
          },
        });
        console.log(data);
        console.log(message);
        console.log(chat);
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        {chat.message ? (
          chat.message.map((item) => {
            return (
              <>
                <div className={`message${item.sender}`}>{item.content}</div>
              </>
            );
          })
        ) : (
          <></>
        )}
        <input
          value={content}
          type="text"
          placeholder="Type..."
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={send}>&gt;</button>
      </div>
    </div>
  );
};

export default Chatting;
