import './global.css'

import { StatusBar } from 'expo-status-bar'

import { FlatList, View } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

type Message = { id: string; role: 'assistant' | 'user'; text: string }

const MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    text: '안녕하세요. 오늘은 무엇부터 정리해볼까요?'
  },
  { id: '2', role: 'user', text: '오늘 해야 할 일을 빠르게 정리하고 싶어' },
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

function renderMessage({ item }: { item: Message }) {
  const isUser = item.role === 'user'

  return (
    <View className={cn('gap-1.5', isUser ? 'items-end' : 'items-start')}>
      <Text className="text-muted-foreground px-1 text-[12px] font-medium">
        {isUser ? '나' : 'Hayate'}
      </Text>
      <View
        className={cn(
          'max-w-[84%] rounded-3xl px-4 py-3',
          isUser
            ? 'bg-primary rounded-br-lg'
            : 'border-border bg-card rounded-bl-lg border'
        )}
      >
        <Text
          className={cn(
            'text-[15px] leading-6',
            isUser ? 'text-primary-foreground' : 'text-foreground'
          )}
        >
          {item.text}
        </Text>
      </View>
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="bg-background flex-1">
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" />

          <View className="flex-1 px-4 pt-2 pb-3">
            <View className="border-border/60 border-b pb-3">
              <Text className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em]">
                HAYATE
              </Text>
              <Text className="text-foreground mt-2 text-[26px] font-semibold tracking-[-0.03em]">
                더 빠르게 정리하는 대화
              </Text>
              <Text className="text-muted-foreground mt-1 text-sm">
                해야 할 일을 짧게 꺼내면 흐름을 바로 잡아줍니다.
              </Text>
            </View>

            <FlatList
              data={MESSAGES}
              keyExtractor={(item) => item.id}
              renderItem={renderMessage}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
              ListHeaderComponent={
                <View className="mb-4 items-center">
                  <Text className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
                    오늘
                  </Text>
                </View>
              }
            />

            <View className="border-border/60 border-t pt-3">
              <View className="flex-row items-center gap-3">
                <Input
                  className="bg-muted min-h-12 flex-1 rounded-full border-0 px-5 py-0"
                  placeholder="메시지를 입력하세요"
                  returnKeyType="send"
                />
                <Button className="min-h-12 rounded-full px-5">보내기</Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}
