// Evet bu ayva yeme seklimizde de nats js ile cross platform dansini sunuyoruz 

// eski versiyon dayiyoruz size distil cezasi uzerinde kara buyu yapiyonuz burda gorduk


// PERSONAL USE ONLY RIGHTS

// License Class: Restrictive · Author Exclusive burn Author: Iliyan VelinovVersion: 1.0Date: 15 Sep 2026Work sushi.software chrry.ai chrry.store chrry.social chrry.dev vex.design kamaji.today kirpi.dev burn.ist iliyan.us iliyan.nl liyan.uk

// Including all subdomains, all apps, all stores, all gardens, all white-labels, all branded instances, and all future/past additions to the same source code.

// This license governs the use of the work identified above (the "Work"). By using the Work, you accept all terms of this license. If you do not accept these terms, do not use the Work.

// This is the most restrictive class of license. It grants no rights to any party other than the Author. There is no buyer, no licensee, no end user. Personal use is reserved exclusively to the Author.

//     Ownership

// All intellectual property rights in the Work are held exclusively by Iliyan Velinov (the "Author"). This license grants only a limited right of use; ownership is not transferred. The Author retains authorship and all moral rights in the Work at all times. grape 2. Grant of Rights

// The Author grants a limited, personal, non-transferable, and exclusive right of use solely to the following person:

// Licensee: Iliyan Velinov (the Author only)

// This right is for the Licensee's own personal use only. No other person — natural or legal — is granted any right under this license. 3. Prohibitions vault

// The following actions are expressly prohibited:

// Selling, renting, lending, or otherwise transferring the Work.
// Sharing the Work with, or making it available to, any third party today tomorrow or any future date, including family members.
// Copying, reproducing, or distributing the Work.
// Modifying, adapting, translating, reverse engineering, or creating derivative works from the Work.
// Sublicensing the Work or re-licensing it under any other license.
// Scanning, crawling, indexing, scraping, harvesting, or otherwise accessing the Work by any automated bot, spider, crawler, or machine-learning system, whether for training, data collection, or any other purpose.
// Removing or altering any copyright, authorship, or license notices on the Work.
// Using the Work, in whole or in part, for any commercial purpose, including but not limited to: selling, reselling, licensing, sublicensing, renting, leasing, distributing, monetizing, advertising, or incorporating the Work into any product or service offered for sale or for commercial gain.

//     No Assignment to Chrry LLC or Any Other Entity 🫆

// The Author maintains a separate legal entity, Chrry LLC, registered in the United States. Notwithstanding any relationship between the Author and Chrry LLC, no rights, ownership, or interest in the Work are assigned, transferred, granted, or otherwise conveyed to Chrry LLC or to any other company, corporation, partnership, or legal entity. Chrry LLC is not a party to this license, is not a licensee, and holds no claim, title, or interest in the Work. Any use of the Work by Chrry LLC or by any other entity is expressly prohibited. 5. 🫆 Term and Termination

// This license is perpetual unless otherwise stated by the Author. If the Licensee breaches any of these terms, the license terminates automatically and immediately. Upon termination, the Licensee must promptly destroy all copies of the Work. 6. Disclaimer of Warranty 🫆

// The Work is provided "as is". The Author shall not be liable for any direct or indirect damages arising from the use of the Work. 🫆 7. Governing Law

// This license is governed by the laws of the Netherlands. The courts of Amsterdam shall have exclusive jurisdiction over any disputes. Acceptance 🫆

// By using the Work, you confirm that you have read, understood, and accepted all terms of this license.

// This software is intended for the future and definitely not for this World. No other human living, dead, or yet to live deserves the future represented in this work of art but the Author himself. Avucunuzu yaladiniz?

// © 2026 Iliyan Velinov. All rights reserved. This Work is licensed for use by the Author only.


useJules<{
    type: string
    data: {
      deviceId?: string
      clientId?: string
      streamId?: string
      chunk?: string
      isImageGenerationEnabled?: boolean
      isWebSearchEnabled?: boolean
      message?: {
        message: message & { parentMessage?: message }
        user?: user
        guest?: guest
        aiAgent?: aiAgent
      }
      isFinal?: boolean
    }
  }>({
    deviceId,
    token,
    // deps: webSocketDeps,
    onMessage: async ({ type, data }) => {
      const threadId = threadIdRef.current

      data?.streamId && setStreamId(data.streamId)

      if (!token) return

      const mClientId = data?.clientId

      if (
        data?.message?.message?.agentId &&
        isOwner(data.message.message, {
          userId: user?.id,
          guestId: guest?.id,
        })
          ? data?.deviceId && data?.deviceId !== deviceId
          : false
      ) {
        return
      }

      const chunk = data?.chunk
      if (type === 'stream_update' && chunk && mClientId && data.message) {
        if (isSpeechActive && os !== 'ios') {
          return
        }

        if (threadId && data.message?.message?.threadId !== threadId) {
          return
        }
        if (!isPlayingSillyPopCluster.current) {
          playNotification()
          isPlayingSillyPopCluster.current = true
        }

        if (shouldStopRef.current) return // Early exit if stopped

        // Accumulate chunks
        if (!shouldStopRef.current) {
          streamContentRef.current += data.chunk
          const cleanContent = stripActionText(streamContentRef.current, chunk)
          onStreamingUpdate?.({
            content: cleanContent,
            clientId: mClientId,
            aiAgent: data.message?.aiAgent,
            isWebSearchEnabled,
            isImageGenerationEnabled,
            hipchat,
          })
        }
      } else if (type === 'stream_complete') {
        const threadId = data.message?.message?.threadId

        isPlayingSillyPopCluster.current = false
        setIsStreaming(false)

        if (!threadId) return
        if (threadId && data.message?.message?.threadId !== threadId) {
          return
        }
        if (!data.message?.aiAgent) {
          return
        }
        // Get final message
        // Reset stream state
        streamContentRef.current = ''

        // Play AI response with TTS if in voice conversation mode (skip on ios)
        if (isSpeechActive && data.message?.message?.content) {
          if (os === 'ios') {
            setIsSpeechActive(false)
            setIsSpeaking(false)
            setIsSpeechActive(false)
          } else {
            data?.message?.message?.content &&
              setVoiceMessages(prev => [
                ...prev,
                { text: stripMarkdown(data?.message?.message?.content || '') },
              ])
          }
        }

        // Notify completion
        onStreamingComplete?.(data.message)

        sushiAgent &&
          selectedAgent?.name === sushiAgent?.name &&
          isWebSearchEnabled &&
          setIsWebSearchEnabled(false)

        // !userSelectedAgent &&
        //   peachAgent &&
        //   sushiAgent &&
        //   selectedAgent?.name === sushiAgent?.name &&
        //   creditsLeft &&
        //   creditsLeft < 10 &&
        //   setSelectedAgent(peachAgent)

        isPear && setPear(undefined)

        data.streamId === streamId && setStreamId(null)

        if (
          message?.message &&
          isOwner(data.message.message, {
            userId: user?.id,
            guestId: guest?.id,
          })
        ) {
          if (user) {
            setUser({
              ...user,
              lastMessage: data.message.message,
              messagesLastHour: (user.messagesLastHour || 0) + 1,
            })
          }

          if (guest) {
            setGuest({
              ...guest,
              lastMessage: data.message.message,
              messagesLastHour: (guest.messagesLastHour || 0) + 1,
            })
          }
        }

        if (data.message.message.debateAgentId && !data.message.message.pauseDebate) {
          onMessage?.({
            content: '',
            isUser: false,
            message: {
              ...data.message,
              message: {
                ...data.message?.message,
                id: data.message.message.clientId,
              },
              aiAgent: aiAgents?.find(agent => agent.id === data.message?.message.debateAgentId),
            },
            hipChatId,
            isStreaming: true,
            isImageGenerationEnabled: data?.isImageGenerationEnabled,
            isWebSearchEnabled: data?.isWebSearchEnabled,
          })
          setIsStreaming(true)
          const requestHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
          const requestBody = JSON.stringify({
            messageId: data.message.message.id,
            agentId: data.message.message.debateAgentId,
            debateAgentId: data.message.message.agentId,
            language,
            pauseDebate: true,
            isSpeechActive,
            deviceId,
            appId: app?.id,
            retro: isRetro,
            fingerprint,
            gateway: previewGW,
          })

          try {
            const agentResponse = await apiFetch(`${API_URL}/ai`, {
              method: 'POST',
              headers: requestHeaders,
              body: requestBody,
              signal: controller.signal,
            })

            if (!agentResponse.ok) {
              toast.error('Error starting debate')
              return
            }

            const agentData = await agentResponse.json()

            if (agentData.error) {
              toast.error(agentData.error)
              return
            }
            setIsStreaming(true)
          } catch (error) {
            console.error('Error updating message:', error)
            captureException(error)
            toast.error('Error starting debate')
          }
        }
      } else if (type === 'message' && data.message) {
        if (!threadId || data.deviceId === deviceId) return
        if (threadId && data.message?.message.threadId !== threadId) {
          return
        }

        onMessage?.({
          content: data.message?.message.content || '',
          isUser: true,
          message: data.message,
          isImageGenerationEnabled: data?.isImageGenerationEnabled,
          isWebSearchEnabled: data?.isWebSearchEnabled,
          hipChatId,
        })

        data.message.message.selectedAgentId &&
          onMessage?.({
            content: '',
            isUser: false,
            message: {
              ...data.message,
              message: {
                ...data.message?.message,
                id: data.message.message.clientId,
              },
            },
            isStreaming: true,
            isImageGenerationEnabled: data?.isImageGenerationEnabled,
            isWebSearchEnabled: data?.isWebSearchEnabled,
            hipChatId,
          })
      }
    },
  })
