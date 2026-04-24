import z from "zod";

export const departmentSchema = z.object({
    fullName: z.string(),
    shortName: z.string(),
    semesters: z.object(),
    color: z.string().optional(),
    iconName: z.enum(["Monitor", "Cpu", "Zap", "Cog", "Building2", "Atom", "FlaskConical", "Calculator", "BookOpen", "Languages", "Landmark", "TrendingUp", "Briefcase", "Leaf", "Microscope"]).optional().default("Monitor"),
    years: z.array(z.number().optional()),
});
