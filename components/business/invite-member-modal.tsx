'use client'

import type React from 'react'

import { inviteTeamMember } from '@/actions/business'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Copy, Mail, MessageSquare, X } from 'lucide-react'
import { useState } from 'react'

interface InviteMemberModalProps {
  isOpen: boolean
  onClose: () => void
  businessId: string
}

export default function InviteMemberModal({
  isOpen,
  onClose,
  businessId,
}: InviteMemberModalProps) {
  const [inviteMethod, setInviteMethod] = useState('email')
  const [inviteStatus, setInviteStatus] = useState<null | 'success' | 'error'>(
    null,
  )
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const contact = formData.get('contact') as string
    const role = formData.get('role') as string

    try {
      // En una aplicación real, esto enviaría la invitación y generaría un código
      const result = await inviteTeamMember({
        businessId,
        contact,
        role,
        method: inviteMethod as 'email' | 'whatsapp',
      })

      setInviteStatus('success')
      setInviteCode(result.code)
    } catch (error) {
      console.error('Error al invitar:', error)
      setInviteStatus('error')
    }
  }

  function copyInviteCode() {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleClose() {
    setInviteStatus(null)
    setInviteCode('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invitar Miembro</DialogTitle>
          <DialogDescription>
            Envía invitaciones por email o WhatsApp con un código único
          </DialogDescription>
        </DialogHeader>

        <Tabs value={inviteMethod} onValueChange={setInviteMethod}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleInvite}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="contact">
                  {inviteMethod === 'email' ? 'Email' : 'Número de WhatsApp'}
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder={
                    inviteMethod === 'email'
                      ? 'correo@ejemplo.com'
                      : '+34600000000'
                  }
                  type={inviteMethod === 'email' ? 'email' : 'tel'}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Rol</Label>
                <Select name="role" defaultValue="editor">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {inviteStatus === 'success' && (
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Invitación enviada correctamente
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Código de invitación:
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="rounded bg-green-100 px-2 py-1 text-sm font-mono dark:bg-green-800/30">
                        {inviteCode}
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={copyInviteCode}
                        className="h-8 w-8"
                        type="button"
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {inviteStatus === 'error' && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="flex items-center">
                    <X className="mr-2 h-5 w-5 text-red-500" />
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      Error al enviar la invitación
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                    Por favor, intenta nuevamente más tarde.
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={inviteStatus === 'success'}>
                Enviar Invitación
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
