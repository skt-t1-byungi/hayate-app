import '~/global.css'

import { useState } from 'react'

import { StatusBar } from 'expo-status-bar'

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View
} from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { ListIcon, PaperPlaneTiltIcon } from 'phosphor-react-native'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

type Message = { id: string; role: 'assistant' | 'user'; text: string }
type Conversation = { id: string; title: string; messages: Message[] }

const CONVERSATIONS: Conversation[] = [
  {
    id: 'conversation-1',
    title: '오늘 할 일 정리',
    messages: [
      {
        id: '1',
        role: 'assistant',
        text: '안녕하세요. 오늘은 무엇부터 정리해볼까요?'
      },
      {
        id: '2',
        role: 'user',
        text: '오늘 해야 할 일을 빠르게 정리하고 싶어'
      },
      {
        id: '3',
        role: 'assistant',
        text: '가장 중요한 일 세 가지만 적어보면 바로 움직이기 쉬워집니다.'
      },
      {
        id: '4',
        role: 'user',
        text: '오전에는 회의 준비, 오후에는 개발 마감이 있어'
      },
      {
        id: '5',
        role: 'assistant',
        text: '좋아요. 회의 준비를 먼저 끝내고, 이후엔 마감 작업만 남도록 흐름을 나눠볼게요.'
      }
    ]
  },
  {
    id: 'conversation-2',
    title: '주간 회고',
    messages: [
      {
        id: '1',
        role: 'assistant',
        text: '이번 주를 돌아보면 가장 잘한 일은 무엇이었나요?'
      },
      {
        id: '2',
        role: 'user',
        text: '기능 배포를 제시간에 끝낸 게 가장 만족스러워'
      },
      {
        id: '3',
        role: 'assistant',
        text: '좋습니다. 그 과정에서 다음에도 반복하고 싶은 습관이 있었는지도 적어보면 좋아요.'
      }
    ]
  },
  {
    id: 'conversation-3',
    title: '운동 루틴',
    messages: [
      {
        id: '1',
        role: 'user',
        text: '퇴근 후에 짧게 할 수 있는 운동 루틴을 만들고 싶어'
      },
      {
        id: '2',
        role: 'assistant',
        text: '20분 기준으로 스쿼트, 푸시업, 플랭크를 순환하면 부담 없이 시작할 수 있어요.'
      },
      {
        id: '3',
        role: 'user',
        text: '너무 힘들지 않게 첫 주 계획만 잡아줘'
      },
      {
        id: '4',
        role: 'assistant',
        text: '좋아요. 첫 주는 주 3회만 진행하고, 각 동작은 30초씩 가볍게 적응하는 방식으로 가볼게요.'
      }
    ]
  },
  {
    id: 'conversation-4',
    title: '여행 준비',
    messages: [
      {
        id: '1',
        role: 'assistant',
        text: '주말 여행 준비를 도와드릴게요. 먼저 가장 중요한 준비물이 무엇인지부터 정리해볼까요?'
      },
      {
        id: '2',
        role: 'user',
        text: '비 오는 날이라 우산이랑 여벌 신발을 챙겨야 할 것 같아'
      },
      {
        id: '3',
        role: 'assistant',
        text: '좋아요. 이동용 가방에는 우산, 여벌 양말, 보조 배터리를 우선 넣는 구성이 좋겠습니다.'
      }
    ]
  },
  {
    id: 'conversation-5',
    title: '독서 메모',
    messages: [
      {
        id: '1',
        role: 'user',
        text: '책을 읽고 나서 핵심만 짧게 정리하는 습관을 만들고 싶어'
      },
      {
        id: '2',
        role: 'assistant',
        text: '한 권당 세 줄만 남긴다고 생각하면 훨씬 가볍게 시작할 수 있습니다.'
      },
      {
        id: '3',
        role: 'user',
        text: '세 줄은 어떤 기준으로 쓰면 좋을까?'
      },
      {
        id: '4',
        role: 'assistant',
        text: '인상 깊은 문장 하나, 배운 점 하나, 바로 써먹을 행동 하나로 나누면 정리가 쉬워져요.'
      }
    ]
  }
]

export default function App() {
  const [conversations] = useState(CONVERSATIONS)
  const [selectedConversationId, setSelectedConversationId] = useState(
    CONVERSATIONS[0]?.id ?? ''
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId
    ) ?? conversations[0]

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId)
    setIsSidebarOpen(false)
  }

  return (
    <SafeAreaProvider>
      <View className="bg-background flex-1">
        <StatusBar style="dark" />
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View className="flex-1 px-4 pt-2">
              <View className="mb-3 flex-row items-center gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="border-border bg-card rounded-full"
                  accessibilityLabel="대화 목록 열기"
                  onPress={() => setIsSidebarOpen(true)}
                >
                  <ListIcon color="#111827" size={20} weight="bold" />
                </Button>
                <View className="flex-1">
                  <Text className="text-foreground text-lg font-semibold">
                    {selectedConversation?.title ?? '대화'}
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    {selectedConversation?.messages.length ?? 0}개의 메시지
                  </Text>
                </View>
              </View>

              <FlatList
                data={selectedConversation?.messages ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isUser = item.role === 'user'
                  return (
                    <View
                      className={cn(
                        'gap-1.5',
                        isUser ? 'items-end' : 'items-start'
                      )}
                    >
                      <Text className="text-muted-foreground px-1 text-[12px] font-medium">
                        {isUser ? '나' : 'Hayate'}
                      </Text>
                      <View
                        className={cn(
                          'max-w-[84%] rounded-3xl border px-4 py-3',
                          isUser
                            ? 'bg-muted rounded-br-lg border-[#b9dcec]'
                            : 'border-border bg-card rounded-bl-lg'
                        )}
                      >
                        <Text
                          className={cn(
                            'text-[15px] leading-6',
                            isUser ? 'text-[#1f536d]' : 'text-foreground'
                          )}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{ flex: 1 }}
                contentContainerStyle={{
                  gap: 12,
                  paddingTop: 8,
                  paddingBottom: 14
                }}
              />

              <SafeAreaView edges={['bottom']} style={{ paddingTop: 12 }}>
                <View className="border-border/70 bg-card rounded-[28px] border px-3 py-3">
                  <View className="flex-row items-center gap-2.5">
                    <Input
                      className="min-h-12 flex-1 rounded-full border border-[#d1e5ef] bg-[#f7fcff] px-5 py-0"
                      placeholder="메시지를 입력하세요"
                      returnKeyType="send"
                    />
                    <Button
                      size="icon"
                      className="bg-primary rounded-full"
                      accessibilityLabel="메시지 보내기"
                    >
                      <PaperPlaneTiltIcon color="#f7fdff" size={20} weight="fill" />
                    </Button>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </KeyboardAvoidingView>

          {isSidebarOpen ? (
            <View className="absolute inset-0 z-10 flex-row">
              <View className="border-border bg-card w-[280px] border-r px-4 pb-6 pt-5">
                <Text className="text-foreground mb-1 text-lg font-semibold">
                  대화 목록
                </Text>
                <Text className="text-muted-foreground mb-4 text-sm">
                  보고 싶은 대화를 선택하세요.
                </Text>

                <View className="gap-2">
                  {conversations.map((conversation) => {
                    const isActive = conversation.id === selectedConversation?.id

                    return (
                      <Pressable
                        key={conversation.id}
                        className={cn(
                          'rounded-2xl border px-4 py-3',
                          isActive
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-background'
                        )}
                        accessibilityRole="button"
                        accessibilityLabel={`${conversation.title} 대화 선택`}
                        onPress={() => handleSelectConversation(conversation.id)}
                      >
                        <Text
                          className={cn(
                            'text-base font-medium',
                            isActive ? 'text-primary' : 'text-foreground'
                          )}
                        >
                          {conversation.title}
                        </Text>
                        <Text className="text-muted-foreground mt-1 text-sm">
                          {conversation.messages.length}개의 메시지
                        </Text>
                      </Pressable>
                    )
                  })}
                </View>
              </View>
              <Pressable
                className="flex-1 bg-black/30"
                accessibilityRole="button"
                accessibilityLabel="대화 목록 닫기"
                onPress={() => setIsSidebarOpen(false)}
              />
            </View>
          ) : null}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}
