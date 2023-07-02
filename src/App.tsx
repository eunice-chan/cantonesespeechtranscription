import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Stack, Box, Center, Text, Button, Space, useMantineTheme, CopyButton, ActionIcon, Tooltip, Title, ScrollArea } from '@mantine/core';
import React from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

function App() {
  const theme = useMantineTheme();
  const [transcripts, setTranscripts] = React.useState<string[]>([]);
  const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition,
  isMicrophoneAvailable,
  } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return (
      <Center w={"100vw"}  h={"100vh"}>
        <Text size="sm" mt="md" color="dimmed">Sorry, your browser does not support speech recognition.</Text>
      </Center>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <Center w={"100vw"}  h={"100vh"}>
        <Text size="sm" mt="md" color="dimmed">Sorry, your microphone is not available.</Text>
      </Center>
    );
  }

  const stopAttempt = () => {
    SpeechRecognition.stopListening();
    setTranscripts([transcript, ...transcripts]);
    resetTranscript();
  }

  return (
    <Center>
      <ScrollArea w={"100vw"} h={"100vh"}>
        <Stack align="center">
          <Space h="xl"/>
          <Title order={1}>Cantonese Speech Transcription</Title>
          <Text size="sm">Microphone: {listening ? 'on ' : 'off'}</Text>
          <Button.Group>
            {!listening && <Button variant="outline" onClick={() => SpeechRecognition.startListening({ language: 'zh-HK', continuous: true })}>Start Speech-to-Text</Button>}
            {listening && <Button variant="outline" onClick={stopAttempt}>Stop Speech-to-Text</Button>}
          </Button.Group>
          
          <Stack align="left" w={"75vw"}>
            {<Text size="sm" mt="md">{transcript}</Text>}
            <Space h="md"/>
            {transcripts.map((attempt) => (
              <Box
                p={"1em"}
                sx={{
                  display: "flex",
                  borderWidth: "1px",
                  borderColor: theme.colors.gray[4],
                  borderStyle: "solid",
                  borderRadius: "0.25rem",
                }}
              >
                
                <Text
                  w={"100%"} 
                  size="sm"
                >
                {attempt}
                </Text>
                <CopyButton value={attempt} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Box>
            ))}
            <Space h="md"/>
          </Stack>
        </Stack>
      </ScrollArea>
    </Center>
  );
}

export default App
