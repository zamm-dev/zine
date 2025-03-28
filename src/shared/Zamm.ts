export interface ZammProjectImplementation {
	id?: string
	name?: string
	description?: string
}

export interface ZammRequirementImplementation {
	id?: string
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
