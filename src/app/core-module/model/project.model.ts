export interface Project {
  id: number;
  tools: string;
  description: string;
  name: string;
  img_url: string;
  language: string;
  gitUrl?: string;
  deploy: boolean;
  deploy_url?: string;
  first_slide?: string;
  sec_slide?: string;
  third_slide?: string;
}
