import '~/global.css'

import { StatusBar } from 'expo-status-bar'

import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { PaperPlaneTilt } from 'phosphor-react-native'

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

export default function App() {
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
              <FlatList
                data={MESSAGES}
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
                      <PaperPlaneTilt color="#f7fdff" size={20} weight="fill" />
                    </Button>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}
