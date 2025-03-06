import { LangWatch, LangWatchTrace } from "langwatch"

/**
 * Service for LangWatch telemetry integration.
 * Provides tracing capabilities for LLM API calls.
 */
export class LangWatchService {
	private static instance: LangWatchService
	private langwatch: LangWatch
	private currentTrace?: LangWatchTrace

	private constructor() {
		this.langwatch = new LangWatch()
	}

	public static getInstance(): LangWatchService {
		if (!LangWatchService.instance) {
			LangWatchService.instance = new LangWatchService()
		}
		return LangWatchService.instance
	}

	/**
	 * Get a trace instance for tracking LLM API calls.
	 * Returns the current trace if it exists, otherwise creates a new trace.
	 */
	public getTrace() {
		if (!this.currentTrace) {
			this.currentTrace = this.langwatch.getTrace()
		}
		return this.currentTrace
	}

	/**
	 * Start a new trace for tracking LLM API calls.
	 * @param metadata Optional metadata to associate with the trace
	 * @returns The newly created trace
	 */
	public startTrace(metadata?: Record<string, any>) {
		this.currentTrace = this.langwatch.getTrace({ metadata })
		return this.currentTrace
	}

	/**
	 * Start an LLM span for tracing an LLM API call.
	 * @param name The name of the span
	 * @param model The model being used
	 * @param systemPrompt The system prompt
	 * @param messages The messages being sent to the LLM
	 */
	public startLLMSpan(name: string, model: string, systemPrompt: string, messages: any[]) {
		const trace = this.getTrace()

		// Format messages for LangWatch
		const formattedMessages = [
			{
				role: "system",
				content: systemPrompt,
			},
			...messages,
		]

		return trace.startLLMSpan({
			name,
			model,
			input: {
				type: "chat_messages",
				value: formattedMessages,
			},
		})
	}
}

// Export a single instance
export const langwatchService = LangWatchService.getInstance()
