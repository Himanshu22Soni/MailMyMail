/* eslint-disable array-callback-return */
import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Checkbox } from "@material-ui/core";
import { Forward, Launch, Print, Reply, Star } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import "./css/MailCards.css";
import Modal from "react-modal";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import LinkIcon from "@material-ui/icons/Link";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import PhotoIcon from "@material-ui/icons/Photo";
import ScreenLockRotationIcon from "@material-ui/icons/ScreenLockRotation";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactQuill from "react-quill";
import IconButton from "@material-ui/core/IconButton";
import "react-quill/dist/quill.snow.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import HTMLReactParser from "html-react-parser";
import { useDispatch } from "react-redux";
import { setMailID } from "../features/mailSlice";
import { selectMailID } from "./../features/mailSlice";
import  firebase  from 'firebase/compat/app';
import 'firebase/compat/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400,
    marginLeft: "5px",
  },
}));

function SimpleAccordion({ key, Id, mail }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState(mail.subject);//forward?`Fwd: < ${mail.subject}>`:`Re: <${mail.subject}>`);
  const [recipient, setRecipient] = useState(mail.to);
  const [forward, setForward] = useState(false);

  const handleReply = () => {
    setModalOpen(true);
    setForward(false);
  };
  const handleForward = () => {
    setModalOpen(true);
    setForward(true);
  };
  const sendMail = (id) => {
    forward ? addForward(id) : addReply(id);
  };
  const addReply = (id) => {
    if(id.mailID){
      db.collection("sentMails").doc(id.mailID).collection("repliedMails").add({
        from: user.email,
        to:recipient,
        subject:`Re: <${subject}>`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        replied:true,
        id:id,
        user:user
      })
      alert("Mail Replied");
      setModalOpen(false);
      setContent("");
    }
  };
  const addForward = (id) => {
    if(id.mailID){
      db.collection("sentMails").doc(id.mailID).collection("forwardedMails").add({
        from: user.email,
        to:recipient,
        subject:`Fwd: <${subject}>`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        forwarded:true,
        id:id,
        user:user
      })
      alert("Mail Forwarded");
      setModalOpen(false);
      setContent("");
    }
  };

  const user = useSelector(selectUser);
  const mailID = useSelector(selectMailID);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Accordion
        key={key}
        onClick={() =>
          dispatch(
            setMailID({
              mailID: Id,
            })
          )
        }
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className="accordMid">
            <div className="accordLeft">
              <Checkbox />
              <Star />
              <Typography className={classes.heading}>
                {mail.user.email === user.email
                  ? "Me"
                  : mail.from.toString().spilt("@")[0].trim()}
              </Typography>
            </div>
            <div className="accordMidMain">
              <Typography className={classes.heading}>
                {mail.subject}
              </Typography>
              <p className={classes.heading}>Click here to see Mail Content</p>
            </div>
            <div className="accordMidDate">
              <Typography className={classes.heading}>
                {new Date(mail.timestamp?.toDate()).toLocaleString()}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDetails">
            <div className="accordDetailsTop">
              <p>{mail.subject}</p>
              <div className="accordDetailsTopRight">
                <Print />
                <Launch />
              </div>
            </div>
            <div className="accordDetailsInfo">
              <Avatar src={mail.user.photo} />
              <div className="sendersInfo">
                <h4>
                  {mail.user.displayName}
                  <small>{mail.from}</small>
                </h4>
                <small>{`To: ${
                  mail.to === user.email ? "Me" : mail.to
                }`}</small>
              </div>
              <div className="sendersInfoDate">
                <div className="sendersInfoDateOption">
                  <small>
                    {new Date(mail?.timestamp.toDate()).toLocaleString()}
                  </small>
                  <Star />
                  <Reply />
                  <MoreVert />
                </div>
              </div>
            </div>
            <div className="mailContent">
              <div className="mailContentAccord">
                {HTMLReactParser(mail.content.toString())}
              </div>
              <ReplyMails />
              <ForwardMails />
              <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                  overlay: {
                    width: 680,
                    height: "auto",
                    zIndex: "1000",
                    backgroundColor: "hsla(0,0,0,0.5)",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-350px",
                    marginTop: "-250px",
                    borderRadius: "10px",
                  },
                  content: {
                    margin: "0",
                    padding: "0",
                    border: "none",
                  },
                }}
              >
                <div className="modalContainer">
                  <div className="modalContainerTop">
                    <div className="modalHeader">
                      <p>{forward ? "Forward" : "Reply"}</p>
                      <div className="modalHeaderIcons">
                        <IconButton onClick={() => setModalOpen(false)}>
                          <CloseIcon className="closeIcon" />
                        </IconButton>
                      </div>
                    </div>
                    <div
                      onClick={() => setFocus(true)}
                      className="modalRecipient"
                    >
                      <p>{focus ? "To" : "Recipients"}</p>
                      <input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="modalRecipient">
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        type="text"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="quill">
                      <ReactQuill
                        value={content}
                        onChange={(value) => setContent(value)}
                        placeholder={
                          forward
                            ? "Add Content then Forward Mail...."
                            : "Add Reply to this Mail...."
                        }
                      />
                    </div>
                  </div>
                  <div className="modalContainerBottom">
                    <div className="modalBottom">
                      <button onClick={(e) => sendMail(mailID)}>
                        {forward ? "Forward" : "Reply"}
                      </button>
                      <TextFormatIcon />
                      <AttachFileIcon />
                      <LinkIcon />
                      <SentimentSatisfiedIcon />
                      <PhotoIcon />
                      <ScreenLockRotationIcon />
                      <div className="modalBottomLast">
                        <MoreVertIcon />
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="mailReplyLinks">
                <div onClick={handleReply} className="mailReplyLink">
                  <Reply />
                  <a href="www.google.com">Reply</a>
                </div>
                <div onClick={handleForward} className="mailReplyLink">
                  <Forward />
                  <a href="www.google.com">Forward</a>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const ReplyMails = () => {};
const ForwardMails = () => {};

function MailCards() {
  const [mails, setMails] = useState([]);
  const [show, setShow] = useState([false]);
  const [userMails, setUserMails] = useState([]);
  const user = useSelector(selectUser);
  React.useEffect(() => {
    db.collection("sentMails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            mail: doc.data(),
          }))
        )
      );
  }, []);

  React.useEffect(() => {
    if (mails.length !== 0) {
      mails.map(({ id, mail }) => {
        if (user.email === mail.to || user.email === mail.from) {
          setShow(true);
          setUserMails(mail);
        }
      });
    }
  }, [mails, user.email]);

  return (
    <div className="mailcards">
      {show &&
        mails.map(({ id, mail }) => {
          if (user.email === mail.to || user.email === mail.from) {
            return (
              <>
                <SimpleAccordion key={id} Id={id} mail={mail} />
              </>
            );
          }
        })}
    </div>
  );
}

export default MailCards;
