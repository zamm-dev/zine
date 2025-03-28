export interface ZammProjectImplementation {
	name?: string
	description?: string
}

export interface ZammRequirementImplementation {
	name?: string
	commit?: string
	details?: string[]
}

export interface ZammRequirement {
	name?: string
	description?: string
	implementations?: ZammRequirementImplementation[]
}

export interface ZammYaml {
	project?: {
		name?: string
		description?: string
		implementations?: ZammProjectImplementation[]
	}
	requirements?: ZammRequirement[]
}
