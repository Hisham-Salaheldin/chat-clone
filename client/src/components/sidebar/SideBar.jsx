'use client'
import {ContactDialog, ConversationDialog, Contact, Chats} from '@/components'
import {Card, CardHeader, CardTitle} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

const SideBar = ({taps,id}) => {
  return (
    <div className='h-screen w-[300px]'>
      <Tabs defaultValue="chats" className="w-full h-full flex flex-col flex-1 gap-0">
        <TabsList className="rounded-none h-full w-full p-0">
          {taps.map((tap) => (
            <TabsTrigger
              key={tap.id}
              value={tap.name}
              className="h-full rounded-none"
            >
              {tap.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {taps.map((tap) => (
          <TabsContent key={tap.id} value={tap.name} className="flex flex-col flex-1">
            <Card className="rounded-none flex-1 overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle>{tap.title}</CardTitle>
              </CardHeader>

              <div className="flex-1 overflow-y-auto">
                {tap.name === 'contacts' ? <Contact /> : <Chats />}
              </div>
              <div className='p-2 bg-stone-200'>{id}</div>
            </Card>
            <div>
              {tap.name === 'contacts' ? (
                <ContactDialog tap={tap} />
              ) : (
                <ConversationDialog tap={tap} />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default SideBar
