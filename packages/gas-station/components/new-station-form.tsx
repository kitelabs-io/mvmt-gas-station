"use client"

import { useState } from "react"
import { PredicateType } from "@/constants/predicate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useNetwork } from "@/hooks/use-network"
import { registerGasStation } from "@/app/actions"

import { Button } from "./ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { Separator } from "./ui/separator"

const formSchema = z
	.object({
		predicateType: z.enum([
			PredicateType.Entry,
			PredicateType.Module,
			PredicateType.Address,
		]),
		predicateValue: z.string(),
	})
	.refine(
		({ predicateType, predicateValue }) => {
			switch (predicateType) {
				case PredicateType.Entry:
					return /^0x[a-fA-F0-9]+::[a-zA-Z0-9_]+::[a-zA-Z0-9_]+$/.test(
						predicateValue
					)
				case PredicateType.Module:
					return /^0x[a-fA-F0-9]+::[a-zA-Z0-9_]+$/.test(predicateValue)
				case PredicateType.Address:
					return /^0x[a-fA-F0-9]+$/.test(predicateValue)
				default:
					return false
			}
		},
		{
			message: "Invalid pattern",
			path: ["predicateValue"],
		}
	)

export default function NewStationForm({ sponsorId }: { sponsorId: string }) {
	const [network] = useNetwork()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const [open, setOpen] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">New Station</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Gas Station</DialogTitle>
					<DialogDescription>Creating an empty gas station</DialogDescription>
				</DialogHeader>

				<Separator />

				<Form {...form}>
					<form
						className="grid w-full gap-4"
						onSubmit={form.handleSubmit(async (values) => {
							setSubmitting(true)
							await registerGasStation({ ...values, sponsorId, network })
							setOpen(false)
							setSubmitting(false)
							form.reset({})
						})}
					>
						<FormField
							control={form.control}
							name="predicateType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Predicate Type</FormLabel>
									<FormControl>
										<Select
											name={field.name}
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select transaction predicate type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={PredicateType.Entry}>
													Entry
												</SelectItem>
												<SelectItem value={PredicateType.Module}>
													Module
												</SelectItem>
												<SelectItem value={PredicateType.Address}>
													Address
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="predicateValue"
							render={({ field }) => {
								const { predicateType } = form.watch()

								const placeholder = (() => {
									switch (predicateType) {
										case PredicateType.Entry:
											return "E.g: 0x1::aptos_account::transfer_coins"
										case PredicateType.Module:
											return "E.g: 0x1::coin"
										case PredicateType.Address:
											return "E.g: 0x1"
										default:
											return "Enter predicate value"
									}
								})()

								return (
									<FormItem>
										<FormLabel>Predicate Value</FormLabel>
										<FormControl>
											<Input {...field} placeholder={placeholder} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>

						<Separator />

						<div className="grid gap-2">
							<Button disabled={submitting} type="submit">
								Save
							</Button>
							<Button variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
