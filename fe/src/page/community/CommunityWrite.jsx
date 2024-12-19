import React, { useContext, useState } from "react";
import axios from "axios";
import { Box, HStack, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../../components/ui/file-button.jsx";
import { HiUpload } from "react-icons/hi";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import MemberLogin from "../member/MemberLogin.jsx";
import { Alert } from "../../components/ui/alert.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { Breadcrumb } from "../../components/root/Breadcrumb.jsx";

function CommunityWrite(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  const handleSaveClick = () => {
    axios
      .postForm(`/api/community/write`, { title, content, files })
      .then((e) => {
        const writeSuccess = e.data.message;
        toaster.create({
          type: writeSuccess.type,
          description: writeSuccess.text,
        });
        navigate(`/community/view/${e.data.id}`);
      })
      .catch((e) => {
        const writeFailure = e.request.response;
        const parsingKey = JSON.parse(writeFailure);
        const type = parsingKey.message.type;
        const text = parsingKey.message.text;
        toaster.create({
          type: type,
          description: text,
        });
      });
  };

  const handleCancelClick = () => {
    navigate(`/community/list`);
  };

  return (
    <div>
      {authentication.isAuthenticated && (
        <div>
          <Breadcrumb
            depth1={"커뮤니티"}
            navigateToDepth1={() => navigate(`/community/list`)}
            depth2={"게시글 작성"}
            navigateToDepth2={() => navigate(`/community/write`)}
          />
          <br />
          <br />
          <Box>
            <h1>게시글 작성</h1>
            <Box
              mx={"auto"}
              w={{
                md: "500px",
              }}
            >
              <Field label={"제목"}>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <Field label={"본문"}>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  h={300}
                />
              </Field>
              <Field label={"파일 첨부"}>
                <FileUploadRoot
                  value={files}
                  maxFiles={5}
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                >
                  <FileUploadTrigger asChild>
                    <div>
                      <Button
                        className={"btn btn-wide"}
                        variant="outline"
                        size="sm"
                      >
                        <HiUpload /> Upload file
                      </Button>
                    </div>
                  </FileUploadTrigger>
                  <FileUploadList showSize clearable />
                </FileUploadRoot>
              </Field>
              <br />
              <Box>
                <HStack>
                  <div>
                    <button
                      className={"btn btn-dark-outline"}
                      onClick={handleCancelClick}
                    >
                      취소
                    </button>
                    <Button
                      className={"btn btn-dark"}
                      onClick={handleSaveClick}
                    >
                      저장
                    </Button>
                  </div>
                </HStack>
              </Box>
            </Box>
          </Box>
        </div>
      )}
      {authentication.isAuthenticated || (
        <Box>
          <Alert
            status="warning"
            title="로그인 한 회원만 게시글 작성이 가능합니다."
          />
          <MemberLogin />
        </Box>
      )}
    </div>
  );
}

export default CommunityWrite;
